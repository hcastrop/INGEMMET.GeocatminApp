using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.ServiceModel.Activation;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;
using AI = INGEMMET.GeocatminApp.Aplicacion.Interfaces;
using II = INGEMMET.GeocatminApp.Infraestructura.IOC;
using INGEMMET.GeocatminApp.Servicios.Interfaces;

namespace INGEMMET.GeocatminApp.Servicios.Servicios
{
    public class Catastro : ICatastro
    {
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :SelListarUbigeo
        //Creado por     :Anderson Ruiz (13/11/2015)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar Provincias, Departamentos y Distritos</summary>
        public List<DE.Catastro> SelListarCatastro(DE.Catastro entCatastro)
        {
            try
            {
                AI.ICatastro _Catastro = II.FabricaIOC.Contenedor.Resolver<AI.ICatastro>();
                return _Catastro.SelListarCatastro(entCatastro);
            }
            catch (Exception e)
            {
                throw new FaultException<DE.Excepcion>(new DE.Excepcion(e), new FaultReason("SelListarCatastro"));
            }
        }
    }
}