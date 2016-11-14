using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace INGEMMET.GeocatminApp.Dominio.Entidades
{
    [DataContract]
    public class Generico
    {
        [DataMember]
        public string Parametro { get; set; }
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public string value { get; set; }
    }
}
