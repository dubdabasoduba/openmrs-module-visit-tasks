/*
 * The contents of this file are subject to the OpenMRS Public License
 * Version 2.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See
 * the License for the specific language governing rights and
 * limitations under the License.
 *
 * Copyright (C) OpenHMIS.  All Rights Reserved.
 *
 */

(function() {
    'use strict';

    var base = angular.module('app.genericManageController');
    base.controller("ManageEntityController", ManageEntityController);
    ManageEntityController.$inject = ['$injector', '$scope', '$filter', 'EntityRestFactory', 'CssStylesFactory',
        'PaginationService', 'PredefinedTasksModel', 'CookiesService','PredefinedTasksRestfulService'];
    
    var ENTITY_NAME = "predefinedTask";

    function ManageEntityController($injector, $scope, $filter, EntityRestFactory, CssStylesFactory, PaginationService,
                                         PredefinedTasksModel, CookiesService,PredefinedTasksRestfulService) {
        var self = this;

        var entity_name = emr.message("visittasks." + ENTITY_NAME + ".name");

        // @Override
        self.getModelAndEntityName = self.getModelAndEntityName || function() {
                self.bindBaseParameters(VISIT_TASKS_MODULE_NAME, ENTITY_NAME, entity_name);
                self.checkPrivileges(TASK_VIEW_MY_PREDEFINED_TASKS);
            };

        // @Override
        self.bindExtraVariablesToScope = self.bindExtraVariablesToScope || function() {
                $scope.postSearchMessage = $filter('EmrFormat')(emr.message("openhmis.commons.general.postSearchMessage"),
                    [self.entity_name]);
		        PredefinedTasksRestfulService.getUserPredefinedTasks(self.onLoadPredefinedVisitTasksSuccessful);
                $scope.myPredefinedTasksPagingFrom = PaginationService.pagingFrom;
                $scope.myPredefinedTasksPagingTo = PaginationService.pagingTo;
                $scope.myPredefinedTasksLimit = CookiesService.get(uuid + 'itemLimit') || 5;
                $scope.myPredefinedTasksCurrentPage = CookiesService.get(uuid + 'itemCurrentPage') || 1;
            };
    
        self.onLoadPredefinedVisitTasksSuccessful = self.onLoadPredefinedVisitTasksSuccessful || function(data) {
                $scope.myPredefinedVisitTasks = data.results;
		        $scope.totalNumOfMyPredefinedVisitTasks = data.length;
            };

        /* ENTRY POINT: Instantiate the base controller which loads the page */
        $injector.invoke(base.GenericManageController, self, {
            $scope: $scope,
            $filter: $filter,
            EntityRestFactory: EntityRestFactory,
            PaginationService: PaginationService,
            CssStylesFactory: CssStylesFactory,
            GenericMetadataModel: PredefinedTasksModel,
            CookiesService: CookiesService
        });
    }
})();
