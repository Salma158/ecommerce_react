function LoadingSpinner() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "24px",
          color: "#333",
        }}
      >
        <div
          className="loading-spinner"
          style={{
            border: "4px solid rgba(0, 0, 0, 0.1)",
            borderLeftColor: "#333",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        Loading...
      </div>{" "}
    </>
  );
}

export default LoadingSpinner;
