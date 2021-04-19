import { useEffect, useState } from "react";
import { RemoteFile } from "generic-filehandle";
import { IndexedCramFile, CraiIndex } from "@gmod/cram";

function App() {
  const [reads, setReads] = useState();
  useEffect(() => {
    (async () => {
      // open local files
      const indexedFile = new IndexedCramFile({
        cramFilehandle: new RemoteFile("volvox-sorted.cram"),
        index: new CraiIndex({
          filehandle: new RemoteFile("volvox-sorted.cram.crai"),
        }),
        seqFetch: async () => {
          return "";
        },
        checkSequenceMD5: false,
      });

      const records = await indexedFile.getRecordsForRange(0, 0, 1000);
      setReads(records);
    })();
  }, []);
  return (
    <div className="App">
      {!reads ? (
        <p>Loading...</p>
      ) : (
        reads.map((r) => (
          <div>
            {r.readName}:{r.alignmentStart}-{r.alignmentStart + r.lengthOnRef}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
