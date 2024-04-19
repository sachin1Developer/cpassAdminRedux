
const CheckTokenExpired = (data) => {
  if (data === 401){
    localStorage.clear()
    window.location.href = '/login'
  }
  return null;
}

export default CheckTokenExpired;