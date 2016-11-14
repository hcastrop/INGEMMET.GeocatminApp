using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Data;
using System.Data.OleDb;


namespace INGEMMET.GeocatminApp.Aplicacion
{
    public class Helpers
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="e"></param>
        /// <returns></returns>
        public static string RaiseError(Exception e)
        {
            StackTrace trace = new StackTrace(e, true);
            string errDataAccess = "DA." + trace.GetFrame(0).GetMethod().ReflectedType.Name + "." + trace.GetFrame(0).GetMethod().Name + ", ";
            string errBusinessLogic = "BL." + trace.GetFrame(1).GetMethod().ReflectedType.Name + "." + trace.GetFrame(1).GetMethod().Name +
                " Number line: " + trace.GetFrame(1).GetFileLineNumber() +
                " Description: " + e.Message;
            return "Source: " + errDataAccess + errBusinessLogic;
        }
        /// <summary>
        /// Permite recuperar los datos sin espacios de un valor
        /// </summary>
        /// <param name="istrData"></param>
        /// <returns></returns>
        [System.Diagnostics.DebuggerStepThrough()]
        public static string RecuperarDataStr(string istrData)
        {
            string strRetorno = string.Empty;

            if (string.IsNullOrEmpty(istrData) == true)
            {
                strRetorno = string.Empty;
            }
            else
            {
                strRetorno = istrData.Trim();
            }

            return strRetorno;
        }
        /// <summary>
        /// Permite recuperar los datos sin espacios de un valor
        /// </summary>
        /// <param name="istrData"></param>
        /// <returns></returns>
        [System.Diagnostics.DebuggerStepThrough()]
        public static int RecuperarDataInt(string istrData)
        {
            int intRetorno = 0;

            if (string.IsNullOrEmpty(istrData) == true)
            {
                intRetorno = 0;
            }
            else
            {
                intRetorno = int.Parse(istrData);
            }

            return intRetorno;
        }
        /// <summary>
        /// Permite recuperar los datos sin espacios de un valor
        /// </summary>
        /// <param name="istrData"></param>
        /// <returns></returns>
        [System.Diagnostics.DebuggerStepThrough()]
        public static double RecuperarDataDbl(string istrData)
        {
            double dblRetorno = 0;

            if (string.IsNullOrEmpty(istrData) == true)
            {
                dblRetorno = 0;
            }
            else
            {
                dblRetorno = double.Parse(istrData);
            }

            return dblRetorno;
        }
    }
}
