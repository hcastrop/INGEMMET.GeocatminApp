using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;
using DO = INGEMMET.GeocatminApp.Dominio;

namespace INGEMMET.GeocatminApp.Presentacion.AgenteDeServicios
{
    public class Combos
    {
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :SelListarUbigeo
        //Creado por     :Anderson Ruiz (13/11/2015)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar Provincias, Departamentos y Distritos</summary>
        public DE.Combos[] SelListarUbigeo(DE.Combos entUbigeo)
        {
            DO.CombosClient clsQuery = new DO.CombosClient();
            DE.Combos[] lisQuery = clsQuery.SelListarUbigeo(entUbigeo);
            clsQuery.Close();
            return lisQuery;
        }

        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :SelListarHojas
        //Creado por     :Hugo Castro (03/10/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar Cuadrangulos Hojas</summary>
        public DE.Combos[] SelListarHojas(DE.Combos entHojas)
        {
            DO.CombosClient clsQuery = new DO.CombosClient();
            DE.Combos[] lisQuery = clsQuery.SelListarHojas(entHojas);
            clsQuery.Close();
            return lisQuery;
        }
    }
}
