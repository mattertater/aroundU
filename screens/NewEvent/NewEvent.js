import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Item, Label, Icon, DatePicker, Input, Left, Button, Body, Title, Footer} from 'native-base';
import colors from '../../config/Colors';
import DateTimePicker from 'react-native-modal-datetime-picker';

class NewEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            organization: '',
            description:'',
            chosenStartDate: new Date(),
            chosenStartTime: new Date(),
            chosenEndDate:new Date(),
            chosenEndTime: new Date(),
            isDateTimePickerVisible: false,
        };
      }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleStartDatePicked = (date) => {
        this.setState({chosenStartTime: date});
        this._hideDateTimePicker();
    };
   
    _handleEndDatePicked = (date) => {
        this.setState({chosenEndTime: date});
        this._hideDateTimePicker();
    };

    _submitToFirebase = () => {
        console.log('submitting to firebase');
        const {title, organization, description, chosenStartDate, chosenStartTime, chosenEndDate, chosenEndTime} = this.state; 
        startTime = chosenStartDate.setHours(chosenStartTime.getHours());
        startTime = chosenStartDate.setMinutes(chosenStartTime.getMinutes());
        startTime = new Date(startTime);
        endTime = chosenEndDate.setHours(chosenEndTime.getHours());
        endTime = chosenEndDate.setMinutes(chosenEndTime.getMinutes());
        endTime = new Date(endTime);
        var event = {
            title: title,
            organization: organization, 
            description: description,
            startTime: startTime,
            endTime: endTime,
            submissionTimestamp: new Date(),
        }
    }

    render(){
        return(
            <Container style={{flexDirection: 'column', flex: 1}}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>New Event</Title>
                    </Body>
                </Header>
                <Content>
                    <Item inlineLabel>
                        <Icon name='add' />
                        <Label>Title</Label>
                        <Input value={this.state.title} onChangeText={title => this.setState({title})}/>
                    </Item>

                    <Item inlineLabel>
                        <Icon name='add' />
                        <Label>Organization</Label>
                        <Input value={this.state.organization} onChangeText={organization => this.setState({organization})}/>
                    </Item>

                    <Item inlineLabel>
                        <Icon name='add' />
                        <Label>Description</Label>
                        <Input value={this.state.description} onChangeText={description => this.setState({description})}/>
                    </Item>
                    
                    <Item inlineLabel>
                        <Icon name='add' />
                        <Label>Start Date</Label>
                        <DatePicker
                        minimumDate={new Date()}
                        defaultDate={new Date()}
                        locale={"en"}
                        formatChosenDate={(date) => date.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={(newDate) => this.setState({ chosenStartDate: newDate })}
                        />
                    </Item>

                    <Item inlineLabel>
                        <Icon name='add' />
                        <Label onPress={this._showDateTimePicker}>Start Time</Label>
                        <DateTimePicker mode='time' is24Hour={false} isVisible={this.state.isDateTimePickerVisible} onConfirm={this._handleStartDatePicked} onCancel={this._hideDateTimePicker}/>
                        <Text>{this.state.chosenStartTime.toLocaleTimeString('en-US')}</Text>
                    </Item>

                    <Item inlineLabel>
                        <Icon name='add' />
                        <Label>End Date</Label>
                        <DatePicker
                        minimumDate={new Date()}
                        defaultDate={new Date()}
                        locale={"en-us"}
                        formatChosenDate={(date) => date.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={(newDate) => this.setState({ chosenEndDate: newDate })}
                        />
                    </Item>
                    <Item inlineLabel>
                        <Icon name='add' />
                        <Label onPress={this._showDateTimePicker}>End Time</Label>
                        <DateTimePicker mode='time' is24Hour={false} isVisible={this.state.isDateTimePickerVisible} onConfirm={this._handleEndDatePicked} onCancel={this._hideDateTimePicker}/>
                        <Text>{this.state.chosenEndTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</Text>
                    </Item>
                </Content>
                <Item style={styles.submitItem}>
                    <Button rounded style={styles.submitButton} onPress={this._submitToFirebase}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </Button>
                </Item>
            </Container>
        );
    }
}
  const styles = StyleSheet.create({
    temp: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitItem: {
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 25,
    },
    submitButton: {
        marginTop: 20,
        width: 150,
        justifyContent: 'center',
        backgroundColor: colors.yellow,
        borderColor: 'transparent',
    },
    submitButtonText: {
        color: colors.black,
    },
  });

  export default NewEvent;
