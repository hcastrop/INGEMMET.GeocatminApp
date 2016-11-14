using INGEMMET.GeocatminApp.Servicios.Interfaces;
using System;
using System.Collections.Generic;
using System.ServiceModel;
using AI = INGEMMET.GeocatminApp.Aplicacion.Interfaces;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;
using II = INGEMMET.GeocatminApp.Infraestructura.IOC;

namespace INGEMMET.GeocatminApp.Servicios.Servicios
{
    public class TablasMaestras : ITablasMaestras
    {
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :ListasTablasMestras
        //Creado por     :Anderson Ruiz (23/09/2016)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar tablas maestras</summary>     
        public List<DE.TablasMaestras> ListasTablasMestras(DE.TablasMaestras entTablasMaestras)
        {
            try
            {
                AI.ITablasMaestras _TablasMaestras = II.FabricaIOC.Contenedor.Resolver<AI.ITablasMaestras>();
                return _TablasMaestras.ListasTablasMestras(entTablasMaestras);
            }
            catch (Exception e)
            {
                throw new FaultException<DE.Excepcion>(new DE.Excepcion(e), new FaultReason("ListasTablasMestras"));
            }
        }
    }
}
