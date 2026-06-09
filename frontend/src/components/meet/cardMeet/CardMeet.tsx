import { useNavigate } from "react-router-dom";
import type { Meet } from "../../../model/Meet";
import meetService from "../../../services/meet";

interface cardMeetProps {
  meet: Meet;
  delteFunc(): void;
}

function CardMeet({ delteFunc, meet: { description, devGroup: { name: devGroupName }, devGroupId, finishTime, id, room, startTime } }: cardMeetProps) {
  const navigate = useNavigate();

  async function deleteMeet() {
    if (!window.confirm("Are you sure?")) return;
    try {
      await meetService.deleteMeet(id);
      delteFunc();
    } catch (e) {
      alert(e);
    }
  }

  const isFuture = new Date(startTime) > new Date();
  const diffHours = Math.round((new Date(finishTime).getTime() - new Date(startTime).getTime()) / 1000 / 60 / 60);

  return (
    <div className="card h-100 border bg-white p-4 rounded-4 transition-all position-relative" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
      <div className="position-absolute" style={{ top: '1.5rem', right: '1.5rem' }}>
        <span 
          className="rounded-circle d-inline-block shadow-sm" 
          title={isFuture ? "Upcoming Meeting" : "Passed Meeting"}
          style={{ 
            width: '12px', 
            height: '12px', 
            backgroundColor: isFuture ? '#ffc107' : '#198754',
            border: '2px solid #fff'
          }} 
        />
      </div>

      <div className="mb-3">
        <span className="text-muted text-uppercase tracking-wider fw-bold d-block" style={{ fontSize: '0.75rem' }}>
          {devGroupName}
        </span>
        <h5 className="card-title fw-semibold m-0 mt-1 text-dark" style={{ fontSize: '1.2rem' }}>
          Room {room}
        </h5>
      </div>

      <p className="text-secondary mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.5', minHeight: '40px' }}>
        {description}
      </p>

      <div className="bg-light p-3 rounded-3 mb-4 d-flex justify-content-between align-items-center text-dark" style={{ fontSize: '0.85rem' }}>
        <div>
          <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Start Time</span>
          <span className="fw-medium d-block mb-2">
            {new Date(startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {new Date(startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>End Time</span>
          <span className="fw-medium">
            {new Date(finishTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {new Date(finishTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="text-end border-start ps-3 align-self-stretch d-flex flex-column justify-content-center">
          <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Duration</span>
          <span className="fw-semibold text-primary">{diffHours} hrs</span>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-auto">
        <button onClick={() => navigate(`/update/${id}`)} className="btn btn-link text-decoration-none text-muted p-0 px-2 fw-medium" style={{ fontSize: '0.85rem' }}>
          Edit
        </button>
        <button onClick={deleteMeet} className="btn btn-link text-decoration-none text-danger p-0 px-2 fw-medium" style={{ fontSize: '0.85rem' }}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default CardMeet;
