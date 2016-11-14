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
    public class CombosController : Controller
    {
        //
        // POST : /Combos/SelListarUbigeo
        [HttpPost]
        public ActionResult SelListarUbigeo(DE.Combos clsCombos)
        {            
            DE.Combos[] dttQuery = new AG.Combos().SelListarUbigeo(clsCombos);
            return Json(dttQuery, JsonRequestBehavior.AllowGet);
        }


        //
        // POST : /Combos/SelListarHojas
        [HttpPost]
        public ActionResult SelListarHojas(DE.Combos clsCombos)
        {
            DE.Combos[] dttQuery = new AG.Combos().SelListarHojas(clsCombos);
            return Json(dttQuery, JsonRequestBehavior.AllowGet);
        }
    }
}
