import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function Resources() {
    const [resources, setResources] = useState([]);

    useEffect(() => {
      const fetchResources = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/faculty/getResources');
          setResources(response.data);
        } catch (error) {
          console.error(error);
          // Handle error, e.g., show an error message
        }
      };
  
      fetchResources();
    }, []); // Empty dependency array ensures the effect runs once on component mount

    const convertUint8ArrayToBase64 = (uint8Array) => {
      return btoa(String.fromCharCode.apply(null, uint8Array));
    };
  
    return (
      <div>
        <h2>Resources List</h2>
        <ul>
          {resources.map((resource) => (
            <li key={resource._id}>
              <p>Company Name: {resource.companyName}</p>
              <p>Scope of Resource: {resource.scopeOfResource}</p>
              {resource.pdfFile && (
                <div>
                  <p>PDF File:</p>
                  <a
                    href={`data:application/pdf;base64,${convertUint8ArrayToBase64(new Uint8Array(resource.pdfFile.data))}`}
                    download={`${resource.companyName}_${resource.scopeOfResource}.pdf`}
                  >
                    Download PDF
                  </a>
                </div>
              )}
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Resources;
