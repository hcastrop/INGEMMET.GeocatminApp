using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Transactions;
using DO = INGEMMET.GeocatminApp.Dominio;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;
using AI = INGEMMET.GeocatminApp.Aplicacion.Interfaces;

namespace INGEMMET.GeocatminApp.Aplicacion
{
    public class PagoVigencia : AI.IPagoVigencia
    {
        private readonly DO.IPagoVigencia _PagoVigencia;
        public PagoVigencia(DO.IPagoVigencia PagoVigencia)
        {
            _PagoVigencia = PagoVigencia;
        }

        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :ListarPagoVigencia
        //Creado por     :Anderson Ruiz (13/10/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listado de pago de vigencia</summary>     
        public List<DE.PagoVigencia> ListarPagoVigencia(DE.PagoVigencia entPagoVigencia)
        {
            List<DE.PagoVigencia> lisQuery = null;
            try
            {
                IEnumerable<DE.PagoVigencia> enuQuery = _PagoVigencia.ListarPagoVigencia(entPagoVigencia);
                if (enuQuery != null)
                {
                    lisQuery = enuQuery.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(Helpers.RaiseError(e));
            }
            return lisQuery;
        }
    }
}