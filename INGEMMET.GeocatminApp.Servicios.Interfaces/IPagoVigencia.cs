using System;
using System.Collections.Generic;
using System.ServiceModel;
using System.Linq;
using System.Text;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;

namespace INGEMMET.GeocatminApp.Servicios.Interfaces
{
    [ServiceContract]
    public interface IPagoVigencia
    {

        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :ListarPagoVigencia
        //Creado por     :Anderson Ruiz (13/10/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listado de pago de vigencia</summary>     
        [OperationContract]
        [FaultContract(typeof(DE.Excepcion))]
        List<DE.PagoVigencia> ListarPagoVigencia(DE.PagoVigencia entPagoVigencia);
    }
}
