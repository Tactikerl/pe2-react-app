const UserLogout = () => {
  const handleStorageClear = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <button onClick={handleStorageClear}>Logout</button>
    </div>
  );
};

export default UserLogout;
