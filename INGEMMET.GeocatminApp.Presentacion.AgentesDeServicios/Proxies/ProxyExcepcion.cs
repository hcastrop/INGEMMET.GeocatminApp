﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//     Versión de runtime:4.0.30319.18034
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
    [System.Runtime.Serialization.DataContractAttribute(Name = "Excepcion", Namespace = "http://schemas.datacontract.org/2004/07/INGEMMET.GeocatminApp.Dominio.Entidades")]
    public partial class Excepcion : object, System.Runtime.Serialization.IExtensibleDataObject
    {

        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;

        private string CodigoField;

        private string MensajeField;

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
        public string Codigo
        {
            get
            {
                return this.CodigoField;
            }
            set
            {
                this.CodigoField = value;
            }
        }

        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Mensaje
        {
            get
            {
                return this.MensajeField;
            }
            set
            {
                this.MensajeField = value;
            }
        }
    }
}

