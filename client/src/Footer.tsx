function Footer() {
  return (
    <>
     <footer
        style={{
          backgroundColor: "#001F3F",
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          bottom: "0",
          left: "0",
          padding: "5px",
        }}
      >
        <p style={{ margin: "5px", padding: "5px" }}>Helldivers Wordle</p>
      </footer>
    </>
  );
}

export default Footer;
