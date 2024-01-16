import { diffInMinutes } from "../helpers/dateHelper.js";

export function getUserConfidence(
  currentConfidenceLevel = 5,
  incidents,
  user_id
) {
  let newConfidenceLevel = currentConfidenceLevel;
  if (incidents.length > 0) {
    newConfidenceLevel = incidents.reduce((acc, incident) => {
      const apertura = new Date(incident.fecha_apertura);
      const cierre = new Date(incident.fecha_cierre);
      console.log(diffInMinutes(apertura, cierre));
      const similarIncidents = incidents.filter(
        (inc) =>
          inc.id_servicio !== incident.id_servicio &&
          diffInMinutes(cierre, new Date(inc.fecha_apertura)) < 3
      );
      if (
        diffInMinutes(apertura, cierre) < 3 &&
        incident.usuario_creador === user_id
      ) {
        return acc - 0.2;
      } else if (
        incident.usuario_cierre === user_id &&
        similarIncidents.length > 0
      ) {
        return acc - 0.2;
      } else if(incident.usuario_cierre === user_id || incident.usuario_creador === user_id) {
        return acc + 0.5;
      } else   {
        return acc;
      }
    }, currentConfidenceLevel);
  }
  console.log(newConfidenceLevel);
  return newConfidenceLevel;
}

export function getComunityConfidence(members) {
  let confidence = members.reduce(
    (acc, member) => acc + member.grado_confianza,
    0
  );
  confidence /= members.length;

  const penalizedMembers = members.filter(
    (member) => member.grado_confianza >= 2 && member.grado_confianza <= 3
  ).length;
  confidence -= 0.2 * penalizedMembers;

  return confidence;
}
