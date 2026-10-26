import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section className="hero p-4 p-md-5 mb-4 text-center text-md-start">
        <h1 className="display-6 fw-bold">Welcome to Bakery Manager</h1>
        <p className="lead mb-4">
          Keep track of your bakeries: their specialty, daily production capacity and whether
          they take custom cake orders.
        </p>
        <div className="d-flex flex-column flex-sm-row gap-2">
          <Link to="/add" className="btn btn-bakery btn-lg">
            Add a Bakery
          </Link>
          <Link to="/bakeries" className="btn btn-outline-dark btn-lg">
            View Bakeries
          </Link>
        </div>
      </section>

      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="card card-soft h-100 p-3">
            <h5 className="card-title">➕ Add</h5>
            <p className="card-text mb-0">
              Register a new bakery. The ID is generated automatically by the database.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card card-soft h-100 p-3">
            <h5 className="card-title">📋 View</h5>
            <p className="card-text mb-0">See every saved bakery in a clean, responsive list.</p>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card card-soft h-100 p-3">
            <h5 className="card-title">🗑️ Delete</h5>
            <p className="card-text mb-0">Remove a bakery you no longer need, with confirmation.</p>
          </div>
        </div>
      </div>
    </>
  );
}
