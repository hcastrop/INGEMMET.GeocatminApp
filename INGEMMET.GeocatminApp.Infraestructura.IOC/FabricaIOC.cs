using Microsoft.Practices.Unity;
using DO = INGEMMET.GeocatminApp.Dominio;
using AP = INGEMMET.GeocatminApp.Aplicacion;
using AI = INGEMMET.GeocatminApp.Aplicacion.Interfaces;
using DA = INGEMMET.GeocatminApp.Infraestructura.DataAccess;

namespace INGEMMET.GeocatminApp.Infraestructura.IOC
{
    public class FabricaIOC
    {
        private static readonly FabricaIOC _contenedor = new FabricaIOC();
        private readonly IUnityContainer _unityContainer;

        private FabricaIOC()
        {
            _unityContainer = new UnityContainer();

            // Registrar los tipos utilizados en la aplicacion.
            // Especificamente con una nueva tecnologia de acceso a datos.
            #region Listar combos
            _unityContainer.RegisterType<DO.ICombos, DA.Combos>();
            _unityContainer.RegisterType<AI.ICombos, AP.Combos>();
            #endregion

            #region Listar catastro
            _unityContainer.RegisterType<DO.ICatastro, DA.Catastro>();
            _unityContainer.RegisterType<AI.ICatastro, AP.Catastro>();
            #endregion

            #region Tablas Maestras
            _unityContainer.RegisterType<DO.ITablasMaestras, DA.TablasMaestras>();
            _unityContainer.RegisterType<AI.ITablasMaestras, AP.TablasMaestras>();
            #endregion

            #region Pago Vigencia
            _unityContainer.RegisterType<DO.IPagoVigencia, DA.PagoVigencia>();
            _unityContainer.RegisterType<AI.IPagoVigencia, AP.PagoVigencia>();
            #endregion
        }

        public static FabricaIOC Contenedor
        {
            get { return _contenedor; }
        }

        /// <summary>
        ///   Crear una instancia de un objeto que implemente un tipo TServicio.
        /// </summary>
        /// <typeparam name = "TServicio">Tipo de servicio que deseamos resolver</typeparam>
        /// <returns></returns>
        public TServicio Resolver<TServicio>() where TServicio : class
        {
            return _unityContainer.Resolve<TServicio>();
        }
    }
}
