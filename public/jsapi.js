const ports = {};


// https://www.jsonrpc.org/specification
window.addEventListener("message", e => {
    console.log('received message on window', e);
    // Check origin
    if (!e.ports[0]) return;
    const referenceId = e.data.referenceId;
    console.log(`referenceId = ${referenceId}`);
    const port = e.ports[0];

    port.start();

    const onPortMessage = e => {
        console.log(`port message`, port, e)
        if (e.data.method) {
            console.log(`received rpc event message with referenceId = ${referenceId} and method ${e.data.method}`);
            switch(e.data.method) {
                case '/v1/onDrill':
                    const filters = e.data.params['filters'];
                    console.log(`filters = ` + JSON.stringify(filters));
                    const iframe = document.querySelector(`#iframe${referenceId}`);
                    if (window.ENV.REPLACE_IFRAME) {
                        iframe.src = `/embed/page?filters=${JSON.stringify(filters)}`
                    }
                    break;
                case '/v1/onFrameSizeChange':
                    console.log(`width = ${e.data.params['width']}`);
                    console.log(`height = ${e.data.params['height']}`);
                    break;
                default:
                    console.log('params = ' + JSON.stringify(e.data.params));
            }
        }
    
        if (e.data.hasOwnProperty('result')) {
            console.log(`received rpc response message with referenceId = ${referenceId}`);
            const result = e.data.result;
            console.log(`result = ${result}`);
        }
    
        if (e.data.error) {
            console.log(`received rpc error message with referenceId = ${referenceId}`);
            console.log('error = ', e.data.error);
        }
    };

    port.onmessage = onPortMessage;
    ports[referenceId] = port;
});

// import moment from 'moment';

const defaultDateFilter = () => {
    const momentStartDate = moment().startOf('year').utc(false).format('MM/DD/YYYY')
    const momentEndDate = moment().endOf('year').subtract(1, 'day').utc(false).format('MM/DD/YYYY')
    console.log(`momentStartDate`, momentStartDate)
    console.log(`momentEndDate`, momentEndDate)
    const dateFilter = {
        "column": "correctedTimezone",
        "values": [
            momentStartDate,
            momentEndDate
        ],
        "operand": "BETWEEN"
    }
    return dateFilter
}


const applyFilters = (filters = []) => {
    
    const newFilters = [defaultDateFilter(), ...filters]
    console.log(`newFitlers`, newFilters)
    console.log(`filters`, filters, ports)
    Object.values(ports).forEach(port => port.postMessage({
        id: 'setFilters123',
        jsonrpc: '2.0',
        method: '/v1/filters/apply',
        params: {
            filters: newFilters
        }
    }));
}

const form_submit = function(event) {
    console.log(`form submit - event`, event)
    event.preventDefault();
    const columnElem = document.querySelector("#column_input");
    const valueElem = document.querySelector("#value_input");
    const column = columnElem.value;
    const value = valueElem.value;
    if (!column && !value) {
        applyFilters();
    } else {
        applyFilters([{"column": column, "operand": "IN", "values": [value]}]);
    }
    columnElem.value = '';
    valueElem.value = '';
}

const reset_form = function() {
    location.reload();
}
