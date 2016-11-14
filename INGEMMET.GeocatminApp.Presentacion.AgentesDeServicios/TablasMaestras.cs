using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;
using DO = INGEMMET.GeocatminApp.Dominio;

namespace INGEMMET.GeocatminApp.Presentacion.AgenteDeServicios
{
    public class TablasMaestras
    {
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :ListasTablasMestras
        //Creado por     :Anderson Ruiz (23/09/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar tablas maestras</summary>     
        public DE.TablasMaestras[] ListasTablasMestras(DE.TablasMaestras entTablasMaestras)
        {
            DO.TablasMaestrasClient clsQuery = new DO.TablasMaestrasClient();
            DE.TablasMaestras[] lisQuery = clsQuery.ListasTablasMestras(entTablasMaestras);
            clsQuery.Close();
            return lisQuery;
        }
    }
}
