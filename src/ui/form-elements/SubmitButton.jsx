export default function SubmitButton({
  loading,
  name,
  className,
  fileLoading,
  event = undefined,
}) {
  return (
    <button
      onClick={event ? event : undefined}
      style={{ opacity: loading || fileLoading ? 0.7 : 1 }}
      disabled={loading || fileLoading}
      type="submit"
      className={`log ${className || ""}`}
    >
      {fileLoading ? "Wait File Uploading" : name}{" "}
      <i
        className={loading || fileLoading ? "fa-solid fa-spinner fa-spin" : ""}
      />
    </button>
  );
}
