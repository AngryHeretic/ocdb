export async function components() {
    return fetch('/api/v1/components').then(response => response.json()).then(addExtraProducts)
};

const extraProducts = [
    {key: 'rhel-8', name: 'Red Hat Enterprise Linux 8'},
    {key: 'rhel-7', name: 'Red Hat Enterprise Linux 7'},
];

function addExtraProducts(products) {
    return new Promise(
        function(resolve, reject) {
            resolve(extraProducts.concat(products).sort(
                function(a, b){
                    return a['name'] < b['name'] ? -1 : 1
                }))
        }
    )
}

export async function componentControls(componentId: string) {
    if (componentId == 'rhel-8') {
        return new Promise(function(resolve, reject) {
            resolve({'errors': [], 'controls': {'NIST-800-53': []}, 'name': 'Red Hat Enterprise Linux 8'})
        })
    }
    if (componentId == 'rhel-7') {
        return new Promise(function(resolve, reject) {
            resolve({'errors': [], 'controls': {'NIST-800-53': []}, 'name': 'Red Hat Enterprise Linux 7'})
        })
    }
    return fetch('/api/v1/components/' + componentId + '/controls')
        .then(response => response.json())
};

export async function certifications() {
    return fetch('/api/v1/certifications').then(response => response.json())
}
