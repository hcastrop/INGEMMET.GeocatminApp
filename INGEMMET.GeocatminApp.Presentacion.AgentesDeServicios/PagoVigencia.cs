using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;
using DO = INGEMMET.GeocatminApp.Dominio;

namespace INGEMMET.GeocatminApp.Presentacion.AgenteDeServicios
{
    public class PagoVigencia
    {
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :ListarPagoVigencia
        //Creado por     :Anderson Ruiz (13/10/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listado de pago de vigencia</summary>     
        public DE.PagoVigencia[] ListarPagoVigencia(DE.PagoVigencia entPagoVigencia)
        {
            DO.PagoVigenciaClient clsQuery = new DO.PagoVigenciaClient();
            DE.PagoVigencia[] lisQuery = clsQuery.ListarPagoVigencia(entPagoVigencia);
            clsQuery.Close();
            return lisQuery;
        }
    }
}
