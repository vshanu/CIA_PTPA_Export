import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as d3 from 'd3';
import { PlayerInfoService } from '../../Services/RetrievePlayerInfo/player-info.service';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

@Component({
  selector: 'app-analysis-component',
  templateUrl: './analysis-component.component.html',
  styleUrls: ['./analysis-component.component.css']
})
export class AnalysisComponentComponent implements OnInit {

  constructor(private _cookieService: CookieService, private _playerInfoService: PlayerInfoService) { }

  showHideDetails: boolean = false;
  playerDetail_Mentors: any = [];
  playerDetail_Mentors_Week: any = [];
  playerDetail_Mentors_Mentors: any = [];
  dataPlayers: any;
  mentorDetails: any = {};
  selectedMentors: any;
  filterBy: string;
  mentorId: string = this._cookieService.get('MentorID');

  selectedLevel: any;
  data: any;

  selectedWeek: any;
  dataWeek: any;

  selectedPlayer: any;
  dataPlayer: any;
  

  selected3() {
    this.mentorDetails.playerId = this.selectedPlayer.playerId;

    /* this._playerInfoService.getplayerMentorDetails_mentor(this.mentorDetails).subscribe((data) => {
      this.playerDetail_Mentors_Mentors = data;      
    });   */ 
  }

  selected2() {

    this.mentorDetails.weekId = this.selectedWeek.weekId;
    /* this._playerInfoService.getplayerMentorDetails_week(this.mentorDetails).subscribe((data) => {
      this.playerDetail_Mentors_Week = data;      
    });  */  
  } 
   

  selected1() {
    this.mentorDetails.monthId = this.selectedLevel.monthId;
    /* this._playerInfoService.getplayerMentorDetails_month(this.mentorDetails).subscribe((data) => {
      this.playerDetail_Mentors = data;      
    });    */
  }


  playerInfo() {
    if(this.mentorId == "AD1")
    {
      this.erase();
      this._playerInfoService.getanalysisplayerDetails(this.mentorDetails).subscribe((data) => {
        this.playerDetail_Mentors = data['userData'];
        let chartData = [];  
        let ChartObj = Object.entries(this.playerDetail_Mentors[0]);
        for (const [metric, average] of ChartObj) {
          chartData.push({'metric': metric, 'average': average});
        }
        this.renderChart(chartData);
      });  

    }
    else{
    this.erase();
    this._playerInfoService.getanalysisplayerDetails(this.mentorDetails).subscribe((data) => {
      this.playerDetail_Mentors = data['userData'];
      let chartData = [];  
      let ChartObj = Object.entries(this.playerDetail_Mentors[0]);
      for (const [metric, average] of ChartObj) {
        chartData.push({'metric': metric, 'average': average});
      }
      this.renderChart(chartData);
    });  
  }
}


  ngOnInit() {

    if(this.mentorId == "AD1")
    {
      console.log("AD1 Is called");
      this._playerInfoService.admingetplayerInfo().subscribe((data) => {
        this.dataPlayers = data;
        console.log(data);
        console.log(this.dataPlayers);
      });   
      this._playerInfoService.getMonths().subscribe((data1) => {
         this.data = data1;
      });
    }

    else{

    this._playerInfoService.getPlayerDetails(this.mentorId).subscribe((data) => {
      this.dataPlayers = data;
      console.log(this.dataPlayers);
      
    });   
    this._playerInfoService.getMonths().subscribe((data1) => {
       this.data = data1;
    });
  }
}

  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
	  return color;
  }

  renderChart(chartData) {
    const margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
          },
          width = 600 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
          // width = +svg.attr('width') - margin.left - margin.right,
          // height = +svg.attr('height') - margin.top - margin.bottom,
    const svg = d3.select('svg');
    const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const parseTime = d3.timeParse('%d-%b-%y');

    // const colorScale = d3.scaleSequential(d3.interpolatePlasma).domain([height, 0]);
    
    const colorScale = d3.scaleLinear()
    	.interpolate(d3.interpolateHslLong)
    	.range(['#C0C0C0', '#800000', '#FFFF00', '#9ACD32', '#556B2F', '#ff7463', '#88fc08', '#ed7f7f'])
    	.domain([height, 0]);

    // const colorScale = d3.scaleSequential(d3.interpolateInferno)
    //   .domain([height, 0])

    const x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .rangeRound([height, 0]);

    x.domain(chartData.map(function (d) {
      return d.metric;
    }));
    y.domain([0, d3.max(chartData, function (d) {
      return Number(d.average);
    })]);

    g.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x))
    .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-55)");

	  g.append('g')
	  .call(d3.axisLeft(y));
    // .append('text')
    // .attr('fill', '#000')
    // .attr('transform', 'rotate(-90)')
    // .attr('y', 6)
    // .attr('dy', '0.71em')
    // .attr('text-anchor', 'end')
    // .text('Average');

    g.selectAll('.bar')
    .data(chartData)
    .enter().append('rect')
    //.attr('fill', (d) => { return colorScale(y(d.average));})
    .attr('fill', (d) => { return this.getRandomColor()})
    // .style('fill', 'steelblue')
    .attr('class', 'bar')
    .attr('x', function (d) {
      return x(d.metric);
    })
    .attr('y', function (d) {
      return y(Number(d.average));
    })
    .attr('width', x.bandwidth())
    .attr('height', function (d) {
      return height - y(Number(d.average));
    });

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x',0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Average');
  }

  erase() {
    d3.selectAll('svg > *').remove();
  }

}
