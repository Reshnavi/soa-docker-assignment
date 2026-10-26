import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createBakery, extractError } from '../api.js';

const EMPTY_FORM = { bakeryName: '', specialty: '', dailyCapacity: '', customCakes: '' };

function validate(form) {
  const errors = {};

  const name = form.bakeryName.trim();
  if (!name) errors.bakeryName = 'Bakery name is required.';
  else if (name.length < 2 || name.length > 100)
    errors.bakeryName = 'Bakery name must be between 2 and 100 characters.';

  const specialty = form.specialty.trim();
  if (!specialty) errors.specialty = 'Specialty is required.';
  else if (specialty.length < 2 || specialty.length > 100)
    errors.specialty = 'Specialty must be between 2 and 100 characters.';

  const capacityText = String(form.dailyCapacity).trim();
  if (capacityText === '') {
    errors.dailyCapacity = 'Daily capacity is required.';
  } else if (!/^-?\d+$/.test(capacityText)) {
    errors.dailyCapacity = 'Daily capacity must be a whole number.';
  } else {
    const n = Number(capacityText);
    if (n < 1 || n > 10000) errors.dailyCapacity = 'Daily capacity must be between 1 and 10000.';
  }

  if (form.customCakes !== 'true' && form.customCakes !== 'false')
    errors.customCakes = 'Please choose whether custom cakes are offered.';

  return errors;
}

export default function AddBakery() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type, text }

  const update = (field, value) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field] || errors[field]) setErrors(validate(next));
  };

  const blur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const showError = (field) => (touched[field] || errors[field]) && errors[field];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    const found = validate(form);
    setErrors(found);
    setTouched({ bakeryName: true, specialty: true, dailyCapacity: true, customCakes: true });
    if (Object.keys(found).length > 0) {
      setFeedback({ type: 'danger', text: 'Please fix the errors below and try again.' });
      return;
    }

    // Note: no ID is sent. The backend/database generates it.
    const payload = {
      bakeryName: form.bakeryName.trim(),
      specialty: form.specialty.trim(),
      dailyCapacity: Number(form.dailyCapacity),
      customCakes: form.customCakes === 'true',
    };

    setSubmitting(true);
    try {
      const saved = await createBakery(payload);
      setFeedback({
        type: 'success',
        text: `Bakery "${saved.bakeryName}" was added successfully (ID: ${saved.id}).`,
      });
      setForm(EMPTY_FORM);
      setErrors({});
      setTouched({});
    } catch (err) {
      const { message, fieldErrors } = extractError(err);
      setErrors(fieldErrors);
      setTouched({ bakeryName: true, specialty: true, dailyCapacity: true, customCakes: true });
      setFeedback({ type: 'danger', text: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-lg-7">
        <div className="card card-soft">
          <div className="card-body p-4">
            <h2 className="h4 mb-1">Add a Bakery</h2>
            <p className="text-muted">All fields are required. The ID is assigned automatically.</p>

            {feedback && (
              <div className={`alert alert-${feedback.type} d-flex justify-content-between align-items-start`} role="alert">
                <div>
                  {feedback.text}
                  {feedback.type === 'success' && (
                    <>
                      {' '}
                      <Link to="/bakeries" className="alert-link">
                        View all bakeries
                      </Link>
                    </>
                  )}
                </div>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setFeedback(null)} />
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="bakeryName" className="form-label">Bakery Name</label>
                <input
                  id="bakeryName"
                  type="text"
                  className={`form-control ${showError('bakeryName') ? 'is-invalid' : ''}`}
                  value={form.bakeryName}
                  maxLength={100}
                  placeholder="e.g. Sweet Crumbs Bakery"
                  onChange={(e) => update('bakeryName', e.target.value)}
                  onBlur={() => blur('bakeryName')}
                />
                <div className="invalid-feedback">{errors.bakeryName}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="specialty" className="form-label">Specialty</label>
                <input
                  id="specialty"
                  type="text"
                  className={`form-control ${showError('specialty') ? 'is-invalid' : ''}`}
                  value={form.specialty}
                  maxLength={100}
                  placeholder="e.g. Sourdough Bread"
                  onChange={(e) => update('specialty', e.target.value)}
                  onBlur={() => blur('specialty')}
                />
                <div className="invalid-feedback">{errors.specialty}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="dailyCapacity" className="form-label">Daily Capacity (items per day)</label>
                <input
                  id="dailyCapacity"
                  type="number"
                  inputMode="numeric"
                  className={`form-control ${showError('dailyCapacity') ? 'is-invalid' : ''}`}
                  value={form.dailyCapacity}
                  placeholder="1 - 10000"
                  onChange={(e) => update('dailyCapacity', e.target.value)}
                  onBlur={() => blur('dailyCapacity')}
                />
                <div className="invalid-feedback">{errors.dailyCapacity}</div>
              </div>

              <div className="mb-4">
                <div className="form-label">Offers Custom Cakes?</div>
                <div className={showError('customCakes') ? 'is-invalid' : ''}>
                  <div className="form-check form-check-inline">
                    <input
                      className={`form-check-input ${showError('customCakes') ? 'is-invalid' : ''}`}
                      type="radio"
                      name="customCakes"
                      id="customYes"
                      value="true"
                      checked={form.customCakes === 'true'}
                      onChange={(e) => update('customCakes', e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="customYes">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className={`form-check-input ${showError('customCakes') ? 'is-invalid' : ''}`}
                      type="radio"
                      name="customCakes"
                      id="customNo"
                      value="false"
                      checked={form.customCakes === 'false'}
                      onChange={(e) => update('customCakes', e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="customNo">No</label>
                  </div>
                </div>
                <div className="invalid-feedback">{errors.customCakes}</div>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-2">
                <button type="submit" className="btn btn-bakery" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    'Add Bakery'
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  disabled={submitting}
                  onClick={() => {
                    setForm(EMPTY_FORM);
                    setErrors({});
                    setTouched({});
                    setFeedback(null);
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
