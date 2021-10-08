import pandas as pd
import pymysql
import logging
import sshtunnel
from sshtunnel import SSHTunnelForwarder

# Credentials
import serverCredentials


# Open Tunnel
def open_ssh_tunnel(verbose=False):
    """Open an SSH tunnel and connect using a username and password.
    
    :param verbose: Set to True to show logging
    :return tunnel: Global SSH tunnel connection
    """

    if verbose:
        sshtunnel.DEFAULT_LOGLEVEL = logging.DEBUG

    global tunnel
    tunnel = SSHTunnelForwarder(
        (serverCredentials.ssh_host, 22),
        ssh_username=serverCredentials.ssh_username,
        ssh_password=serverCredentials.ssh_password,
        remote_bind_address=('127.0.0.1', 3306)
    )

    tunnel.start()

# Connect to MySQL via the SSH tunnel
def mysql_connect():
    """Connect to a MySQL server using the SSH tunnel connection
    
    :return connection: Global MySQL database connection
    """

    global connection

    connection = pymysql.connect(
        host='127.0.0.1',
        user=serverCredentials.database_username,
        passwd=serverCredentials.database_password,
        db=serverCredentials.database_name,
        port=tunnel.local_bind_port
    )

# Run read SQL query
def run_read_query(sql):
    """Runs a given SQL query via the global database connection.
    
    :param sql: MySQL query
    :return: Pandas dataframe containing results
    """

    return pd.read_sql_query(sql, connection)

def run_insert_query(sql):
    cursor = connection.cursor()

    cursor.execute(sql)

    connection.commit()


# Disconnect and close the tunnel
def mysql_disconnect():
    """Closes the MySQL database connection.
    """

    connection.close()

def close_ssh_tunnel():
    """Closes the SSH tunnel connection.
    """

    tunnel.close

# Simplify connection and disconnection
def connect():
    open_ssh_tunnel()
    mysql_connect()

def disconnect():
    mysql_disconnect()
    close_ssh_tunnel()