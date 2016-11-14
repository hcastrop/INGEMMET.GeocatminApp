using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;
using DO = INGEMMET.GeocatminApp.Dominio;

namespace INGEMMET.GeocatminApp.Infraestructura.DataAccess
{
    public class PagoVigencia : DO.IPagoVigencia
    {
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :ListarPagoVigencia
        //Creado por     :Anderson Ruiz (13/10/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listado de pago de vigencia</summary>     
        public List<DE.PagoVigencia> ListarPagoVigencia(DE.PagoVigencia entPagoVigencia)
        {
            List<DE.PagoVigencia> lisQuery = null;
            Database Db = DatabaseFactory.CreateDatabase();
            using (DbCommand dbCommand = Db.GetStoredProcCommand("DATA_GIS.PACK_DBA_WEBGEOCATMIN_JS.P_SEL_EST_DISTRIBUCION", new object[2]))
            {
                Db.SetParameterValue(dbCommand, "VI_VA_CODDEM", entPagoVigencia.sTipo);
                using (IDataReader dtrQuery = Db.ExecuteReader(dbCommand))
                {
                    lisQuery = new List<DE.PagoVigencia>();
                    while (dtrQuery.Read())
                    {
                        DE.PagoVigencia entQuery = new DE.PagoVigencia();
                        entQuery.sNombre = (string)(dtrQuery["NOMBRE"].ToString());
                        entQuery.sDAnio1 = (string)(dtrQuery["DOLARES_ANIO_1"].ToString());
                        entQuery.sDAnio2 = (string)(dtrQuery["DOLARES_ANIO_2"].ToString());
                        entQuery.sDAnio3 = (string)(dtrQuery["DOLARES_ANIO_3"].ToString());
                        entQuery.sDTotal = (string)(dtrQuery["TOTAL_DOLARES"].ToString());
                        entQuery.sSAnio1 = (string)(dtrQuery["SOLES_ANIO_1"].ToString());
                        entQuery.sSAnio2 = (string)(dtrQuery["SOLES_ANIO_2"].ToString());
                        entQuery.sSAnio3 = (string)(dtrQuery["SOLES_ANIO_3"].ToString());
                        entQuery.sSTotal = (string)(dtrQuery["TOTAL_SOLES"].ToString());
                        lisQuery.Add(entQuery);
                    }
                }
                return lisQuery;
            }
        }
    }
}