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
    public class Combos : AI.ICombos
    {
        private readonly DO.ICombos _Combos;
        public Combos(DO.ICombos Combos)
        {
            _Combos = Combos;
        }
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :SelListarHojas
        //Creado por     :Hugo Castro (03/10/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar Cuadrangulos, Hojas</summary>
        public List<DE.Combos> SelListarHojas(DE.Combos entHojas)
        {

            List<DE.Combos> lisQuery = null;
            try
            {
                IEnumerable<DE.Combos> enuQuery = _Combos.SelListarHojas(entHojas);
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

        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :SelListarUbigeo
        //Creado por     :Anderson Ruiz (13/11/2015)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar Provincias, Departamentos y Distritos</summary>
        public List<DE.Combos> SelListarUbigeo(DE.Combos entUbigeo)
        {

            List<DE.Combos> lisQuery = null;
            try
            {
                IEnumerable<DE.Combos> enuQuery = _Combos.SelListarUbigeo(entUbigeo);
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
