using System;
using System.Collections.Generic;
using System.ServiceModel;
using System.Linq;
using System.Text;
using DE = INGEMMET.GeocatminApp.Dominio.Entidades;

namespace INGEMMET.GeocatminApp.Servicios.Interfaces
{
    [ServiceContract]
    public interface ICatastro
    {
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        //Metodo         :SelListarUbigeo
        //Creado por     :Anderson Ruiz (13/11/2015)
        //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
        ///<summary>Listar Provincias, Departamentos y Distritos</summary>
        [OperationContract]
        [FaultContract(typeof(DE.Excepcion))]
        List<DE.Catastro> SelListarCatastro(DE.Catastro entCatastro);

    }
}