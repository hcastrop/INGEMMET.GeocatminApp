using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Runtime.Serialization;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;
using AG = INGEMMET.GeocatminApp.Presentacion.AgenteDeServicios;

namespace INGEMMET.GeocatminApp.Presentacion.Web.Controllers
{
    public class PagoVigenciaController : Controller
    {
        //
        // POST : /PagoVigencia/ListarPagoVigencia
        [HttpPost]
        public ActionResult ListarPagoVigencia(DE.PagoVigencia clsPagoVigencia)
        {
            DE.PagoVigencia[] dttQuery = new AG.PagoVigencia().ListarPagoVigencia(clsPagoVigencia);
             return Json(dttQuery, JsonRequestBehavior.AllowGet);
        }

    }
}
