export const ConfigFile= {
    Url:{
        entityUrl:"http://localhost:59360/api/Entity",
        transactionUrl:'http://localhost:59360/api/Transaction/',
        requestUrl:'http://localhost:59360/api/Request/',
        locationUrl:'http://localhost:59360/api/LocationStructure',
        ccCodeUrl:'http://localhost:59360/api/CcCode',
        requestByUrl:'http://localhost:59360/api/request/getbyauthority',
        historyAuthorityUrl:'http://localhost:59360/api/request/Historyauthority',
        authorityUrl:'http://localhost:59360/api/ApprovingAuthority/',
        floorUrl:'http://localhost:59360/api/FloorStructure/',
         backUrl :'http://localhost:59360/api/LocationStructure',
         addUrl :'http://localhost:59360/api/BuildingStructure',
         buildUrl : 'http://localhost:59360/api/BuildingStructure/GetByLocationId/',
    },

    keys:{
        rejected:"rejected",
        pending: "pending",
        forwarded:"forwarded",
        approved:"approved",
        closed:"closed",
        error:"Error",
        notFound:"Result Not Found",
        success:"Updated Successfully",
        deleteSuccess:"Deleted Successfully",
        internalServerError:"Internal Server Error",
        ok:"Ok",
        active:"active",
        deactive:"deactive",
        closedODC:"closed",
        openODC:"open",
        csoControl:"cso-control",
        assetControl: "asset-control",
        user:"user"
    }

}