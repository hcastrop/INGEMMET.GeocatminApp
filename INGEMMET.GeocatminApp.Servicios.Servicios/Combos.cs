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
    public class Combos : ICombos
    {
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :SelListarHojas
        //Creado por     :Hugo Castro (03/10/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar Cuadrangulos, Hojas x Ubigeo</summary>
        public List<DE.Combos> SelListarHojas(DE.Combos entHojas)
        {
            try
            {
                AI.ICombos _Combos = II.FabricaIOC.Contenedor.Resolver<AI.ICombos>();
                return _Combos.SelListarHojas(entHojas);
            }
            catch (Exception e)
            {
                throw new FaultException<DE.Excepcion>(new DE.Excepcion(e), new FaultReason("SelListarHojas"));
            }
        }

        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :SelListarUbigeo
        //Creado por     :Anderson Ruiz (13/11/2015)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar Provincias, Departamentos y Distritos</summary>
        public List<DE.Combos> SelListarUbigeo(DE.Combos entUbigeo)
        {
            try
            {
                AI.ICombos _Combos = II.FabricaIOC.Contenedor.Resolver<AI.ICombos>();
                return _Combos.SelListarUbigeo(entUbigeo);
            }
            catch (Exception e)
            {
                throw new FaultException<DE.Excepcion>(new DE.Excepcion(e), new FaultReason("SelListarUbigeo"));
            }
        }        
    }
}
