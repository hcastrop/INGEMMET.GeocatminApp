using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace INGEMMET.GeocatminApp.Dominio.Entidades
{
    //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
    //Creado por     : Anderson Ruiz (13/11/2015)
    //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
    /// <summary> Permite llenar los conbos</summary>
    [DataContract]
    public class Catastro
    {
        [DataMember]
        public string Parametro { get; set; }
        
        [DataMember]
        public string CODIGOU  { get; set; }

        [DataMember]
        public string DERECHO_MINERO  { get; set; }

        [DataMember]
        public string TITULAR_REFERENCIAL { get; set; }
        
        [DataMember]
        public string HECTAREA { get; set; }
        
        [DataMember]
        public string ESTADO { get; set; }
        
        [DataMember]
        public string FORMULACION { get; set; }
        
        [DataMember]
        public string HORA_FORMULACION { get; set; }
        
        [DataMember]
        public string TIPO { get; set; }
        
        [DataMember]
        public string CARTA { get; set; }
        
        [DataMember]
        public string ZONA { get; set; }
        
        [DataMember]
        public string RESOLUCION_TITULO { get; set; }
        
        [DataMember]
        public string FECHA_RES_TITULO { get; set; }
        
        [DataMember]
        public string DECICION_DE_TITULACION { get; set; }
        
        [DataMember]
        public string RESOLUCION_EXTINCION { get; set; }
        
        [DataMember]
        public string FECHA_RES_EXTINCION { get; set; }

        [DataMember]
        public string DECISION_EXTINCION { get; set; }
        
        [DataMember]
        public string UBICACION_EXPEDIENTE { get; set; }
        
        [DataMember]
        public string CALIFICACION { get; set; }
        
        [DataMember]
        public string SUSTANCIA { get; set; }
        
        [DataMember]
        public string DEPARTAMENTO { get; set; }
        
        [DataMember]
        public string PROVINCIA { get; set; }
        
        [DataMember]
        public string DISTRITO { get; set; }
        
        [DataMember]
        public string DIRECCION { get; set; }


        //[DataMember]
        //public Nullable<int> has { get; set; }

    }
}
