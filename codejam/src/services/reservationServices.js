const getReservas = async () => {
  try {
    let response = await fetch("/api/reservas.json");
    let reservas = await response.json();
    console.log(reservas);

    return reservas;
  } catch (error) {
    console.log(error);
  }
};

const getReserva = async (id) => {
  try {
    let response = await fetch("/api/reservas.json");
    let data = await response.json();
    let reservas = data.reservas;

    let reservaFound = reservas.find((reserva) => reserva.id == id);
    return reservaFound;
  } catch (error) {
    throw new Error("No se pudo obtener la data de la reserva.");
  }
};

export default {
  getReservas,
  getReserva,
};
