﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//     Versión de runtime:4.0.30319.42000
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace INGEMMET.GeocatminApp.Dominio.Entidades
{
    using System.Runtime.Serialization;
    
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="TablasMaestras", Namespace="http://schemas.datacontract.org/2004/07/INGEMMET.GeocatminApp.Dominio.Entidades")]
    public partial class TablasMaestras : object, System.Runtime.Serialization.IExtensibleDataObject
    {
        
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        private string sCamposField;
        
        private string sCodigoField;
        
        private string sCriteriosField;
        
        private string sDescripcionField;
        
        private string sDetalleField;
        
        private string sNombreTablaField;
        
        private string sOrdenField;
        
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData
        {
            get
            {
                return this.extensionDataField;
            }
            set
            {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string sCampos
        {
            get
            {
                return this.sCamposField;
            }
            set
            {
                this.sCamposField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string sCodigo
        {
            get
            {
                return this.sCodigoField;
            }
            set
            {
                this.sCodigoField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string sCriterios
        {
            get
            {
                return this.sCriteriosField;
            }
            set
            {
                this.sCriteriosField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string sDescripcion
        {
            get
            {
                return this.sDescripcionField;
            }
            set
            {
                this.sDescripcionField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string sDetalle
        {
            get
            {
                return this.sDetalleField;
            }
            set
            {
                this.sDetalleField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string sNombreTabla
        {
            get
            {
                return this.sNombreTablaField;
            }
            set
            {
                this.sNombreTablaField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string sOrden
        {
            get
            {
                return this.sOrdenField;
            }
            set
            {
                this.sOrdenField = value;
            }
        }
    }    
}

namespace INGEMMET.GeocatminApp.Dominio
{
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName = "ITablasMaestras")]
    public interface ITablasMaestras
    {

        [System.ServiceModel.OperationContractAttribute(Action = "http://tempuri.org/ITablasMaestras/ListasTablasMestras", ReplyAction = "http://tempuri.org/ITablasMaestras/ListasTablasMestrasResponse")]
        [System.ServiceModel.FaultContractAttribute(typeof(INGEMMET.GeocatminApp.Dominio.Entidades.Excepcion), Action = "http://tempuri.org/ITablasMaestras/ListasTablasMestrasExcepcionFault", Name = "Excepcion", Namespace = "http://schemas.datacontract.org/2004/07/INGEMMET.GeocatminApp.Dominio.Entidades")]
        INGEMMET.GeocatminApp.Dominio.Entidades.TablasMaestras[] ListasTablasMestras(INGEMMET.GeocatminApp.Dominio.Entidades.TablasMaestras entTablasMaestras);
    }

    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface ITablasMaestrasChannel : ITablasMaestras, System.ServiceModel.IClientChannel
    {
    }

    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class TablasMaestrasClient : System.ServiceModel.ClientBase<ITablasMaestras>, ITablasMaestras
    {

        public TablasMaestrasClient()
        {
        }

        public TablasMaestrasClient(string endpointConfigurationName) :
            base(endpointConfigurationName)
        {
        }

        public TablasMaestrasClient(string endpointConfigurationName, string remoteAddress) :
            base(endpointConfigurationName, remoteAddress)
        {
        }

        public TablasMaestrasClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) :
            base(endpointConfigurationName, remoteAddress)
        {
        }

        public TablasMaestrasClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) :
            base(binding, remoteAddress)
        {
        }

        public INGEMMET.GeocatminApp.Dominio.Entidades.TablasMaestras[] ListasTablasMestras(INGEMMET.GeocatminApp.Dominio.Entidades.TablasMaestras entTablasMaestras)
        {
            return base.Channel.ListasTablasMestras(entTablasMaestras);
        }
    }
}