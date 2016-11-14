using System.Collections.Generic;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;

namespace INGEMMET.GeocatminApp.Aplicacion.Interfaces
{
   public interface ITablasMaestras
    {
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :ListasTablasMestras
        //Creado por     :Anderson Ruiz (23/09/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar tablas maestras</summary>     
        List<DE.TablasMaestras> ListasTablasMestras(DE.TablasMaestras entTablasMaestras);
    }
}
