using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;
using DO = INGEMMET.GeocatminApp.Dominio;

namespace INGEMMET.GeocatminApp.Infraestructura.DataAccess
{
    public class TablasMaestras : DO.ITablasMaestras
    {
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :ListasTablasMestras
        //Creado por     :Anderson Ruiz (23/09/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar tablas maestras</summary>     
        public List<DE.TablasMaestras> ListasTablasMestras(DE.TablasMaestras entTablasMaestras)
        {
            List<DE.TablasMaestras> lisQuery = null;
            Database Db = DatabaseFactory.CreateDatabase();
            using (DbCommand dbCommand = Db.GetStoredProcCommand(" PACK_DBA_WEBGEOCATMIN.P_SEL_VARIOS", new object[5]))
            {
                Db.SetParameterValue(dbCommand, "VI_VA_TABLA", entTablasMaestras.sNombreTabla);
                Db.SetParameterValue(dbCommand, "VI_VA_CAMPOS", entTablasMaestras.sCampos);
                Db.SetParameterValue(dbCommand, "VI_VA_CRITERIO", entTablasMaestras.sCriterios);
                Db.SetParameterValue(dbCommand, "VI_VA_CAMPO_ORDEN", entTablasMaestras.sOrden);

                using (IDataReader dtrQuery = Db.ExecuteReader(dbCommand))
                {
                    lisQuery = new List<DE.TablasMaestras>();
                    while (dtrQuery.Read())
                    {
                        DE.TablasMaestras entQuery = new DE.TablasMaestras();
                        entQuery.sCodigo = (string)(dtrQuery["CODIGO"].ToString());
                        entQuery.sDescripcion = (string)(dtrQuery["DESCRIPCION"].ToString());
                        entQuery.sDetalle = (string)(dtrQuery["DETALLE"].ToString());
                        lisQuery.Add(entQuery);
                    }
                }
            }

            return lisQuery;
        }
    }
}