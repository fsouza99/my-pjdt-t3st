'use client';

// Alert box for texts with an optional bold leading text.
export default function BriefAlert({ bold, message, type, alignment }) {
  const className = `mx-auto max-w-90 w-25rem alert alert-${type || "info"} text-${alignment || "center"}`;

  return (
    <div className={className} role="alert">
      <small>
        {bold && <b>{bold}: </b>}
        {message}
      </small>
    </div>
  );
}

