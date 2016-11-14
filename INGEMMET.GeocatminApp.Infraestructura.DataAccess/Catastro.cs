using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;
using DO = INGEMMET.GeocatminApp.Dominio;

namespace INGEMMET.GeocatminApp.Infraestructura.DataAccess
{
    public class Catastro : DO.ICatastro
    {
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :SelListarUbigeo
        //Creado por     :Anderson Ruiz (13/11/2015)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar Provincias, Departamentos y Distritos</summary>
        public List<DE.Catastro> SelListarCatastro(DE.Catastro entCatastro)
        {
            List<DE.Catastro> lisQuery = null;
            Database Db = DatabaseFactory.CreateDatabase();
            using (DbCommand dbcommand = Db.GetStoredProcCommand("DATA_GIS.PACK_DBA_WEBGEOCATMIN_JS.P_SEL_CATASTRO", new object[2]))
            {
                Db.SetParameterValue(dbcommand, "VA_VI_CRITERIO", entCatastro.Parametro);
                using (IDataReader dtrQuery = Db.ExecuteReader(dbcommand))
                {
                    lisQuery = new List<DE.Catastro>();
                    while (dtrQuery.Read())
                    {
                        DE.Catastro entQuery = new DE.Catastro();
                        entQuery.CODIGOU = (string)(dtrQuery["CODIGOU"].ToString());
                        entQuery.DERECHO_MINERO = (string)(dtrQuery["DERECHO_MINERO"].ToString());
                        entQuery.TITULAR_REFERENCIAL = (string)(dtrQuery["TITULAR_REFERENCIAL"].ToString());
                        entQuery.HECTAREA = (string)(dtrQuery["HECTAREA"].ToString());
                        entQuery.ESTADO = (string)(dtrQuery["ESTADO"].ToString());
                        entQuery.FORMULACION = (string)(dtrQuery["FORMULACION"].ToString());
                        entQuery.HORA_FORMULACION = (string)(dtrQuery["HORA_FORMULACION"].ToString());
                        entQuery.TIPO = (string)(dtrQuery["TIPO"].ToString());
                        entQuery.CARTA = (string)(dtrQuery["CARTA"].ToString());
                        entQuery.ZONA = (string)(dtrQuery["ZONA"].ToString());
                        entQuery.RESOLUCION_TITULO = (string)(dtrQuery["RESOLUCION_TITULO"].ToString());
                        entQuery.FECHA_RES_TITULO = (string)(dtrQuery["FECHA_RES_TITULO"].ToString());
                        entQuery.DECICION_DE_TITULACION = (string)(dtrQuery["DECICION_DE_TITULACION"].ToString());
                        entQuery.RESOLUCION_EXTINCION = (string)(dtrQuery["RESOLUCION_EXTINCION"].ToString());
                        entQuery.FECHA_RES_EXTINCION = (string)(dtrQuery["FECHA_RES_EXTINCION"].ToString());
                        entQuery.DECISION_EXTINCION = (string)(dtrQuery["DECISION_EXTINCION"].ToString());
                        entQuery.UBICACION_EXPEDIENTE = (string)(dtrQuery["UBICACION_EXPEDIENTE"].ToString());
                        entQuery.CALIFICACION = (string)(dtrQuery["CALIFICACION"].ToString());
                        entQuery.SUSTANCIA = (string)(dtrQuery["SUSTANCIA"].ToString());
                        entQuery.DEPARTAMENTO = (string)(dtrQuery["DEPARTAMENTO"].ToString());
                        entQuery.PROVINCIA = (string)(dtrQuery["PROVINCIA"].ToString());
                        entQuery.DISTRITO = (string)(dtrQuery["DISTRITO"].ToString());
                        entQuery.DIRECCION = (string)(dtrQuery["DIRECCION"].ToString());
                        lisQuery.Add(entQuery);
                    }
                }
            }
            return lisQuery;
        }
    }
}