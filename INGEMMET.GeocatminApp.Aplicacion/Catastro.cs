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
    public class Catastro : AI.ICatastro
    {
        private readonly DO.ICatastro _Catastro;
        public Catastro(DO.ICatastro Catastro)
        {
            _Catastro = Catastro;
        }

        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :SelListarUbigeo
        //Creado por     :Anderson Ruiz (13/11/2015)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar Provincias, Departamentos y Distritos</summary>
        public List<DE.Catastro> SelListarCatastro(DE.Catastro entCatastro)
        {

            List<DE.Catastro> lisQuery = null;
            try
            {
                IEnumerable<DE.Catastro> enuQuery = _Catastro.SelListarCatastro(entCatastro);
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
