using System.Collections.Generic;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;

namespace INGEMMET.GeocatminApp.Dominio
{
    public interface IPagoVigencia
    {
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :ListarPagoVigencia
        //Creado por     :Anderson Ruiz (13/10/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listado de pago de vigencia</summary>     
        List<DE.PagoVigencia> ListarPagoVigencia(DE.PagoVigencia entPagoVigencia);
    }
}
