using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Optimization;

namespace INGEMMET.GeocatminApp.Presentacion.Web
{
    public class BundleConfig
    {
        // Para obtener más información acerca de Bundling, consulte http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();

            // Scripts base proyecto
            var ScriptBase = new ScriptBundle("~/Base/js").Include(
                "~/Scripts/env.js",
                "~/Scripts/simpleLoader.js",
                "~/Scripts/init.js");
            ScriptBase.Orderer = new PassthruBundleOrderer();
            bundles.Add(ScriptBase);
        }

        class PassthruBundleOrderer : IBundleOrderer
        {
            public IEnumerable<FileInfo> OrderFiles(BundleContext context, IEnumerable<FileInfo> files)
            {
                return files;
            }
        }
    }
}