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
    public class TablasMaestras : AI.ITablasMaestras
    {
        private readonly DO.ITablasMaestras _TablasMaestras;
        public TablasMaestras(DO.ITablasMaestras TablasMaestras)
        {
            _TablasMaestras = TablasMaestras;
        }

        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :ListasTablasMestras
        //Creado por     :Anderson Ruiz (23/09/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar tablas maestras</summary>     
        public List<DE.TablasMaestras> ListasTablasMestras(DE.TablasMaestras entTablasMaestras)
        {
            List<DE.TablasMaestras> lisQuery = null;
            try
            {
                IEnumerable<DE.TablasMaestras> enuQuery = _TablasMaestras.ListasTablasMestras(entTablasMaestras);
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