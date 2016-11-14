using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;
using DO = INGEMMET.GeocatminApp.Dominio;

namespace INGEMMET.GeocatminApp.Infraestructura.DataAccess
{
    public class Combos : DO.ICombos
    {
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :SelListarHojas
        //Creado por     :Hugo Castro (03/10/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar Cuadrangulos Hojas</summary>
        public List<DE.Combos> SelListarHojas(DE.Combos entHojas)
        {
            List<DE.Combos> lisQuery = null;
            Database Db = DatabaseFactory.CreateDatabase();
            using (DbCommand dbcommand = Db.GetStoredProcCommand("DATA_GIS.PACK_DBA_WEBGEOCATMIN_JS.P_SEL_HOJA_UBIGEO", new object[2]))
            {
                Db.SetParameterValue(dbcommand, "VI_VA_UBIGEO", entHojas.Parametro);
                using (IDataReader dtrQuery = Db.ExecuteReader(dbcommand))
                {
                    lisQuery = new List<DE.Combos>();
                    while (dtrQuery.Read())
                    {
                        DE.Combos entQuery = new DE.Combos();
                        entQuery.value = (string)(dtrQuery["CODIGO"].ToString());
                        entQuery.name = (string)(dtrQuery["DESCRIPCION"].ToString());

                        lisQuery.Add(entQuery);
                    }
                }
            }
            return lisQuery;
        }

        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :SelListarUbigeo
        //Creado por     :Anderson Ruiz (13/11/2015)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar Provincias, Departamentos y Distritos</summary>
        public List<DE.Combos> SelListarUbigeo(DE.Combos entUbigeo)
        {
            List<DE.Combos> lisQuery = null;
            Database Db = DatabaseFactory.CreateDatabase();
            using (DbCommand dbcommand = Db.GetStoredProcCommand("DATA_GIS.PACK_DBA_WEBGEOCATMIN_JS.P_SEL_UBIGEO", new object[2]))
            {
                Db.SetParameterValue(dbcommand, "VI_VA_UBIGEO", entUbigeo.Parametro);
                using (IDataReader dtrQuery = Db.ExecuteReader(dbcommand))
                {
                    lisQuery = new List<DE.Combos>();
                    while (dtrQuery.Read())
                    {
                        DE.Combos entQuery = new DE.Combos();
                        entQuery.value = (string)(dtrQuery["CODIGO"].ToString());
                        entQuery.name = (string)(dtrQuery["DESCRIPCION"].ToString());

                        lisQuery.Add(entQuery);
                    }
                }
            }
            return lisQuery;
        }
    }
}