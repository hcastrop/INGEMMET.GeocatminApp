using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.ServiceModel.Activation;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;
using AI = INGEMMET.GeocatminApp.Aplicacion.Interfaces;
using II = INGEMMET.GeocatminApp.Infraestructura.IOC;
using INGEMMET.GeocatminApp.Servicios.Interfaces;

namespace INGEMMET.GeocatminApp.Servicios.Servicios
{
    public class PagoVigencia : IPagoVigencia
    {

        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :ListarPagoVigencia
        //Creado por     :Anderson Ruiz (13/10/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listado de pago de vigencia</summary>     
        public List<DE.PagoVigencia> ListarPagoVigencia(DE.PagoVigencia entPagoVigencia)
        {
            try
            {
                AI.IPagoVigencia _PagoVigencia = II.FabricaIOC.Contenedor.Resolver<AI.IPagoVigencia>();
                return _PagoVigencia.ListarPagoVigencia(entPagoVigencia);
            }
            catch (Exception e)
            {
                throw new FaultException<DE.Excepcion>(new DE.Excepcion(e), new FaultReason("ListarPagoVigencia"));
            }
        }
    }
}
