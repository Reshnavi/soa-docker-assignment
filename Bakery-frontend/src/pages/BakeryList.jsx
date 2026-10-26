import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBakeries, deleteBakery, extractError } from '../api.js';

function CakeBadge({ value }) {
  return value ? (
    <span className="badge text-bg-success">Yes</span>
  ) : (
    <span className="badge text-bg-secondary">No</span>
  );
}

export default function BakeryList() {
  const [bakeries, setBakeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [feedback, setFeedback] = useState(null); // { type, text }
  const [toDelete, setToDelete] = useState(null); // bakery object awaiting confirmation
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setBakeries(await getBakeries());
    } catch (err) {
      setLoadError(extractError(err).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteBakery(toDelete.id);
      setBakeries((list) => list.filter((b) => b.id !== toDelete.id));
      setFeedback({ type: 'success', text: `Bakery "${toDelete.bakeryName}" was deleted.` });
    } catch (err) {
      setFeedback({ type: 'danger', text: extractError(err).message });
    } finally {
      setDeleting(false);
      setToDelete(null);
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
        <h2 className="h4 mb-0">All Bakeries</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={load} disabled={loading}>
            Refresh
          </button>
          <Link to="/add" className="btn btn-bakery">
            + Add Bakery
          </Link>
        </div>
      </div>

      {feedback && (
        <div className={`alert alert-${feedback.type} d-flex justify-content-between align-items-start`} role="alert">
          <div>{feedback.text}</div>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setFeedback(null)} />
        </div>
      )}

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-2">Loading bakeries...</p>
        </div>
      )}

      {!loading && loadError && (
        <div className="alert alert-danger d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2" role="alert">
          <div>{loadError}</div>
          <button className="btn btn-sm btn-outline-danger" onClick={load}>
            Try again
          </button>
        </div>
      )}

      {!loading && !loadError && bakeries.length === 0 && (
        <div className="card card-soft text-center p-5">
          <div className="display-5">🍞</div>
          <h5 className="mt-2">No bakeries found</h5>
          <p className="text-muted">Nothing has been added yet. Add your first bakery to see it here.</p>
          <div>
            <Link to="/add" className="btn btn-bakery">
              Add a Bakery
            </Link>
          </div>
        </div>
      )}

      {!loading && !loadError && bakeries.length > 0 && (
        <>
          {/* Table on tablet / desktop */}
          <div className="card card-soft d-none d-md-block">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Bakery Name</th>
                    <th>Specialty</th>
                    <th className="text-end">Daily Capacity</th>
                    <th>Custom Cakes</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bakeries.map((b) => (
                    <tr key={b.id}>
                      <td>{b.id}</td>
                      <td className="fw-semibold">{b.bakeryName}</td>
                      <td>{b.specialty}</td>
                      <td className="text-end">{b.dailyCapacity}</td>
                      <td><CakeBadge value={b.customCakes} /></td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-danger" onClick={() => setToDelete(b)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards on mobile */}
          <div className="d-md-none d-flex flex-column gap-3">
            {bakeries.map((b) => (
              <div className="card card-soft" key={b.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title mb-1">{b.bakeryName}</h5>
                    <span className="text-muted small">#{b.id}</span>
                  </div>
                  <p className="mb-1"><strong>Specialty:</strong> {b.specialty}</p>
                  <p className="mb-1"><strong>Daily capacity:</strong> {b.dailyCapacity}</p>
                  <p className="mb-3"><strong>Custom cakes:</strong> <CakeBadge value={b.customCakes} /></p>
                  <button className="btn btn-sm btn-outline-danger w-100" onClick={() => setToDelete(b)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete confirmation dialog */}
      {toDelete && (
        <div className="modal-backdrop-custom" role="dialog" aria-modal="true" aria-labelledby="deleteTitle">
          <div className="card card-soft" style={{ maxWidth: 420, width: '100%' }}>
            <div className="card-body p-4">
              <h5 id="deleteTitle" className="mb-2">Delete bakery?</h5>
              <p className="text-muted">
                Are you sure you want to delete <strong>{toDelete.bakeryName}</strong>? This cannot be undone.
              </p>
              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-outline-secondary" onClick={() => setToDelete(null)} disabled={deleting}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDelete} disabled={deleting}>
                  {deleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
