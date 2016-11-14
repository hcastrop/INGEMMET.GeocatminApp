using System.Runtime.Serialization;

namespace INGEMMET.GeocatminApp.Dominio.Entidades
{
    //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
    //Creado por     : Anderson Ruiz (23/09/2016)
    //ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ
    /// <summary> listar tablas maestras </summary>
    [DataContract]
    public class TablasMaestras
    {
        [DataMember]
        public string sNombreTabla { get; set; }
        [DataMember]
        public string sCampos { get; set; }
        [DataMember]
        public string sCriterios { get; set; }
        [DataMember]
        public string sOrden { get; set; }
        //Datos Aumentados
        [DataMember]
        public string sCodigo { get; set; }
        [DataMember]
        public string sDescripcion { get; set; }
        [DataMember]
        public string sDetalle { get; set; }
    }
}
