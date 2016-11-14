using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace INGEMMET.GeocatminApp.Dominio.Entidades
{
    /// <summary> Entidad = Exception </summary>
    [DataContract, Serializable]
    public class Excepcion
    {
        [DataMember()]
        public string Codigo { get; set; }
        [DataMember()]
        public string Mensaje { get; set; }

        #region Constructor
        public Excepcion(Exception e)
        {
            this.Codigo = "Error";
            this.Mensaje = e.Message;
        }
        #endregion
    }
}
