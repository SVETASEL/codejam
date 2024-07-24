const getReservations = async () => {
  try {
    let response = await fetch("/api/reservas.json");
    let reservations = await response.json();
    return reservations;
  } catch (error) {
    console.log(error);
  }
};

export default getReservations;
