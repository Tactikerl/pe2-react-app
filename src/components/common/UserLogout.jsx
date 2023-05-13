const UserLogout = () => {
  const handleStorageClear = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <button onClick={handleStorageClear}>Logout</button>
    </div>
  );
};

export default UserLogout;
