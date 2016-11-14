using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace INGEMMET.GeocatminApp.Dominio.Entidades
{
    [DataContract]
    public class PagoVigencia
    {
        [DataMember]
        public string sTipo { get; set; }
        [DataMember]
        public string sNombre { get; set; }
        [DataMember]
        public string sDAnio1 { get; set; }
        [DataMember]
        public string sDAnio2 { get; set; }
        [DataMember]
        public string sDAnio3 { get; set; }
        [DataMember]
        public string sDTotal { get; set; }
        [DataMember]
        public string sSAnio1 { get; set; }
        [DataMember]
        public string sSAnio2 { get; set; }
        [DataMember]
        public string sSAnio3 { get; set; }
        [DataMember]
        public string sSTotal { get; set; }
    }
}
