export default function PendingButton(props) {
  return (
    <button
      className={props.className}
      disabled={props.disabled}
      form={props.formId}
      onClick={props.onClick}
      type={props.type}>
      {
        props.pending ? (
          <>
            <span
              aria-hidden="true"
              className="spinner-border spinner-border-sm" />
            <span className="mx-2" role="status">{props.pendingLabel}</span>
          </>
        ) : props.idleLabel
      }
    </button>
  );
}

